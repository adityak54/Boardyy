import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    let boards = [];

    if (args.favorites) {
      // Fetch favorite boards
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((b) => b.boardId);
      boards = await getAllOrThrow(ctx.db, ids);

      // Map the favorite status to each board
      boards = boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    } else if (args.search) {
      // Search for boards by title
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) => q.search("title", args.search!))
        .collect();
    } else {
      // Fetch all boards for the organization
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("asc")
        .collect();
    }

    // Fetch all favorite relations for the current user
    const favoriteRelations = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_org", (q) =>
        q.eq("userId", identity.subject).eq("orgId", args.orgId)
      )
      .collect();

    // Map the favorite status to each board
    boards = boards.map((board) => ({
      ...board,
      isFavorite: !!favoriteRelations.find((fav) => fav.boardId === board._id),
    }));

    return boards;
  },
});
