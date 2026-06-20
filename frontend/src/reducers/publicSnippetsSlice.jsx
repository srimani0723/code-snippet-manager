import { createSlice } from "@reduxjs/toolkit";

const publicSnippetsSlice = createSlice({
  name: "publicSnippets",
  initialState: {
    search: "",
    page: 1,
    limit: 6,
    language: "",
    tags: "",
    isPublic: true,
    total: 0,
    pages: 1,
  },
  reducers: {
    updateFilters: (state, action) => {
      const {
        search = state.search,
        page = state.page,
        limit = state.limit,
        language = state.language,
        tags = state.tags,
        isPublic = state.isPublic,
      } = action.payload;
      state.search = search;
      state.page = page;
      state.limit = limit;
      state.language = language;
      state.tags = tags;
      state.isPublic = isPublic;
    },
  },
});

export const { updateFilters } = publicSnippetsSlice.actions;
export default publicSnippetsSlice.reducer;
