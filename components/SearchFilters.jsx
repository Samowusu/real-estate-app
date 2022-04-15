import React, { useState, useEffect } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Spinner,
  Icon,
  Button,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { filterData, getFilterValues } from "../utilities/filterData";
import { fetchApi, baseUrl } from "../utilities/fetchApi";
import noResult from "../assets/images/noresult.svg";

const SearchFilters = () => {
  const [showLocationState, setShowLocationState] = useState(false);
  const [searchTermState, setSearchTermState] = useState("");
  const [isLoadingState, setisLoadingState] = useState(false);
  const [locationDataState, setLocationDataState] = useState();
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (searchTermState !== "") {
      const fetchData = async () => {
        setisLoadingState(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTermState}`
        );
        setisLoadingState(false);
        setLocationDataState(data?.hits);
      };

      timer = setTimeout(fetchData, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchTermState]);

  // this function updates the URL based on the selected filtered values
  const searchProperties = (filteredValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filteredValues);

    values.forEach((item) => {
      if (item.value && filteredValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex bg={"gray.100"} p="4" justifyContent={"center"} flexWrap="wrap">
      {filterData.map((filter) => (
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
      <Flex flexDirection={"column"}>
        <Button
          border="1px"
          borderColor="gray.200"
          marginTop="2"
          onClick={() => setShowLocationState((prevState) => !prevState)}
        >
          Search Location
        </Button>
        {showLocationState && (
          <Flex flexDir="column" pos="relative" paddingTop="2">
            <Input
              placeholder="Type Here"
              value={searchTermState}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchTermState(e.target.value)}
            />
            {searchTermState !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchTermState("")}
              />
            )}
            {isLoadingState && <Spinner margin="auto" marginTop="3" />}
            {showLocationState && (
              <Box height="300px" overflow="auto">
                {locationDataState?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocationState(false);
                      setSearchTermState(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!isLoadingState && !locationDataState?.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    marginTop="5"
                    marginBottom="5"
                  >
                    <Image src={noResult} />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
