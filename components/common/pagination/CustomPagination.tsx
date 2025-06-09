import Pagination from "@cherry-soft/react-native-basic-pagination";
import React from "react";
import { View } from "react-native";

interface CustomPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
}

export default function CustomPagination({
  totalItems,
  currentPage,
  setCurrentPage,
}: CustomPaginationProps) {
    
  return (
    <View className="flex bg-gray-400 justify-center w-fit">
      <Pagination
        totalItems={totalItems}
        pageSize={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pagesToDisplay={1}
        showLastPagesButtons
        btnStyle={{
          borderRadius: 10,
          backgroundColor: "#e5e7eb",
          borderWidth: 0,
          elevation: 2,
          shadowRadius: 2,
          shadowOpacity: 0.3,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
        }}
        textStyle={{
          fontFamily: "Outfit_500Medium",
          color: "black",
          fontSize: 12,
        }}
        activeTextStyle={{
          fontFamily: "Outfit_500Medium",
          color: "white",
        }}
        containerStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </View>
  );
}
