import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import StarFilledIcon from "../image/star_filled.svg";
import StarIcon from "../image/star.svg";

interface StarCount {
    score: number;
}

export default function Star({ score }: StarCount) {
    return (
        <Box>
            <Flex>
                {[...Array(5)].map((_, index) => {
                    return (
                        index < score ? <StarFilledIcon key={index} width="20px" height="20px" /> : <StarIcon key={index} width="20px" height="20px" />
                    );
                })}
            </Flex>
        </Box>
    );
}