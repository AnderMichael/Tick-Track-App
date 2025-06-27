import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface UPBCodeSearchBarProps {
  onSearch: (code: string) => void;
  reset: () => void;
}

export default function UPBCodeSearchBar({
  onSearch,
  reset,
}: UPBCodeSearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");

    if (text !== numericText) {
      setErrorMessage("Solo se permiten números.");
    } else if (numericText.length > 7) {
      setErrorMessage("El código no puede tener más de 7 dígitos.");
    } else {
      setErrorMessage("");
    }

    setInputValue(numericText);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <View>
      <SearchBar
        placeholder="Buscar código UPB..."
        onChangeText={handleChange}
        value={inputValue}
        containerStyle={{
          backgroundColor: "#fff",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 10,
          marginHorizontal: 20,
          marginTop: 10,
        }}
        inputContainerStyle={{ backgroundColor: "#fff", height: 30 }}
        inputStyle={{
          color: "#000",
          fontFamily: "Outfit_400Regular",
          textAlignVertical: "center",
          fontSize: 14,
        }}
        lightTheme
        round
        showCancel={true}
        onCancel={() => {
          setInputValue("");
          setErrorMessage("");
          reset();
        }}
        onClear={() => {
          setInputValue("");
          setErrorMessage("");
          reset();
        }}
        onSubmitEditing={handleSearch}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearIcon={{ color: "gray" }}
        cancelIcon={{ color: "gray" }}
        searchIcon={{ color: "gray" }}
        cancelButtonTitle="Cancelar"
        cancelButtonProps={{ color: "gray" }}
        keyboardType="numeric"
      />

      {!!errorMessage && (
        <Text
          className="text-red-500 text-xs font-outfit-light mx-8 mt-2"
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
