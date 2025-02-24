"use client"

import { useState, useRef, useEffect } from "react"
import { Flex, Box, Text, Input, HStack, Spinner } from "@chakra-ui/react"
import { FiSearch } from "react-icons/fi"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Item from "../../components/Item"

interface ItemData {
    id: string;
    title: string;
    thumbnail: string;
    star: number;
    row_material: Array<string>;
    product_id: string;
    price: number;
    price_2: number;
    capacity: string;
    how_to_take: string;
}

const fetchSearchData = async (query: string): Promise<ItemData[]> => {
    if (!query?.trim()) return [];
    const response = await axios.get<ItemData[]>(`https://vita.ajb.kr/api/search/?query=${encodeURIComponent(query)}`);
    return response.data;
};

export default function Search() {
    const router = useRouter();
    
    const [inputQuery, setInputQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    
    const scrollRef = useRef<HTMLDivElement | null>(null);
    
    const { data: searchResults = [], isLoading } = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: () => fetchSearchData(searchQuery),
        enabled: !!searchQuery,
        staleTime: Infinity,
    });

    useEffect(() => {
        // URL에서 쿼리 파라미터 읽기
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query') || '';
        setInputQuery(query);
        setSearchQuery(query);
    }, []);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const handleWheel = (e: WheelEvent): void => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                element.scrollLeft += e.deltaY + e.deltaX;
            }
        };

        element.addEventListener('wheel', handleWheel, { passive: false });
        return () => element.removeEventListener('wheel', handleWheel);
    }, []);

    const handleSearch = () => {
        if (!inputQuery?.trim()) return;
        router.push(`/search?query=${encodeURIComponent(inputQuery)}`);
        setSearchQuery(inputQuery);
        console.log(searchResults.length);
    };
    
    return (
        <Box h="100vh" w="100vw" bg="gray.50">
            <Flex h="90px" w="100%" justifyContent="space-between" alignItems="center" px="40px">
                <Box>
                    <Link href="/">
                        <Text color="black" fontSize="30px">나만의 영양제</Text>
                    </Link>
                </Box>

                <Flex w="700px"
                    h="50px"
                    bg="#F2F2F2"
                    borderRadius="30px"
                    alignItems="center"
                    p="9px"
                    pr="15px"
                >
                    <Input 
                        placeholder="영양제 검색"
                        color="black"
                        borderColor="#F2F2F2"
                        outline="none"
                        fontSize="20px"
                        _placeholder={{ color: "#AAAAAA" }}
                        value={inputQuery}
                        onChange={(e) => setInputQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <Box onClick={handleSearch} cursor="pointer">
                        <FiSearch color="#AAAAAA" size="30px" />
                    </Box>
                </Flex>

                <Box w="160px" />
            </Flex>

            {isLoading && (
                <Flex
                    position="fixed"
                    align="center"
                    justifyContent="center"
                    w="100vw"
                    h="100vh"
                    bg="black"
                    opacity="0.5"
                >
                    <Spinner size="xl" />
                </Flex>
            )}
            {searchResults.length === 0 && !isLoading ? (
                <Flex
                    position="fixed"
                    align="center"
                    justifyContent="center"
                    w="100vw"
                    h="100vh"
                >
                    <Text color="black">
                        검색 결과를 찾을 수 없습니다
                    </Text>
                </Flex>
            ) : null}

            <Box mt="50px"
                px="120px"
                w="100%"
                overflow="scroll"
                ref={scrollRef}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}
            >
                <HStack minW="max-content" pb={4}>
                    {searchResults.map((item, index) => (
                        <Item
                            key={item.product_id || index}
                            item_id={item.product_id}
                            item_name={item.title}
                            item_image={item.thumbnail}
                            item_description={item.how_to_take}
                            star_count={item.star}
                        />
                    ))}
                </HStack>
            </Box>
        </Box>
    )
}