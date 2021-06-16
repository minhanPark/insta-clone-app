import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { logUserOut } from "../apollo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
  const { data, loading, refetch, fetchMore, error } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  console.log(error);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
