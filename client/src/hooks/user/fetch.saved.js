import { useInfiniteQuery } from "@tanstack/react-query";

import { savedPost } from "../../helper/helper";


export const useSavedQuery = (userId) => {
    const query = useInfiniteQuery(["saved", userId], ({ pageParam = 0 }) => savedPost(userId, pageParam), {
        getNextPageParam: (lastPage) => lastPage.next,
    });
    return query;
};
