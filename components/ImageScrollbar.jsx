import React, { useContext } from "react";
import Image from "next/image";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => {
          scrollPrev();
          console.log("clicked left");
        }}
        fontSize="2xl"
        cursor={"pointer"}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} marginRight="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => {
          scrollNext();
          console.log("right clicked");
        }}
        fontSize="2xl"
        cursor={"pointer"}
      />
    </Flex>
  );
};

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {data?.map((image) => (
        <Box
          width={"910px"}
          itemID={image.id}
          key={image.id}
          overflow="hidden"
          padding={"1"}
        >
          <Image
            placeholder="blur"
            blurDataURL={image.url}
            src={image.url}
            width={1000}
            height={500}
            alt="property"
            sizes="(max-width:500px) 100px, (max-width:1024px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
