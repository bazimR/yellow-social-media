import { useInfiniteQuery } from "@tanstack/react-query";

import { homePost } from "../../helper/helper";

export const useUsersQuery = (userId) => {
    const query = useInfiniteQuery(["posts", userId], ({ pageParam = 0 }) => homePost(userId, pageParam), {
        getNextPageParam: (lastPage) => lastPage.next,
        refetchOnWindowFocus: false,
        keepPreviousData:true,
    });

    return query;
};
