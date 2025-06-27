import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface TextSearchBarProps {
  onSearch: (text: string) => void;
  reset: () => void;
}

export default function TextSearchBar({
  onSearch,
  reset,
}: TextSearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (text: string) => {
    const onlyText = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "");

    if (text !== onlyText) {
      setErrorMessage("Solo se permite texto sin números ni símbolos.");
    } else if (onlyText.length > 40) {
      setErrorMessage("El texto no puede tener más de 40 caracteres.");
    } else {
      setErrorMessage("");
    }

    setInputValue(onlyText);
  };

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  return (
    <View>
      <SearchBar
        placeholder="Buscar por nombre..."
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
        autoCapitalize="words"
        autoCorrect={true}
        returnKeyType="search"
        clearIcon={{ color: "gray" }}
        cancelIcon={{ color: "gray" }}
        searchIcon={{ color: "gray" }}
        cancelButtonTitle="Cancelar"
        cancelButtonProps={{ color: "gray" }}
        keyboardType="default"
      />

      {!!errorMessage && (
        <Text className="text-red-500 text-xs font-outfit-light mx-8 mt-2">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
