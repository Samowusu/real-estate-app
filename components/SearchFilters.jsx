import React, { useState, useEffect } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { filterData, getFilterValues } from "../utilities/filterData";

const SearchFilters = () => {
  const [filtersState, setFiltersState] = useState(filterData);
  const router = useRouter();

  // this function updates the URL based on the selected filtered values
  const searchProperties = (filteredValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filteredValues);

    values.forEach((item) => {
      query[item.name] = item.value;
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex bg={"gray.100"} p="4" justifyContent={"center"} flexWrap="wrap">
      {filtersState.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
          >
            {filter.items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
