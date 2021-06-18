import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: string!, $page: Int!) {
    searchPhotos(keyword: $keyword, page: $page) {
      id
      file
    }
  }
`;

const Input = styled.TextInput``;

export default function Search({ navigation }) {
  const { setValue, register } = useForm();
  const [startQueryFn, { loading, data }] = useLazyQuery(SEARCH_PHOTOS);
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword");
  }, []);
  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Photo</Text>
      </View>
    </DismissKeyboard>
  );
}
