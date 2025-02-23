"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Flex, Box, Text, Input } from "@chakra-ui/react"
import { FiSearch } from "react-icons/fi"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const Search = () => {
        router.push("/search?query=" + encodeURI(searchQuery))
    }

    return (
        <Flex justifyContent="center" alignItems="center" h="100vh" bg="gray.50">
            <Box>
                <Flex justifyContent="center">
                    <Text color="black" fontSize="40px">나만의 영양제</Text>
                </Flex>
                <Flex w="700px"
                    h="60px"
                    bg="#F2F2F2"
                    borderRadius="30px"
                    alignItems="center"
                    p="9px"
                    pr="15px"
                    mt="15px"
                >
                    <Input placeholder="영양제 검색"
                        color="black"
                        borderColor="#F2F2F2"
                        outline="none"
                        fontSize="20px"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                Search();
                            }
                        }}
                        _placeholder={{ color: "#AAAAAA" }}
                    />
                    <Box onClick={() => {Search()}} cursor="pointer">
                        <FiSearch color="#AAAAAA" size="30px" />
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}