import { Box, Image, Text } from '@chakra-ui/react';
import Star from './Star';

interface ItemProps {
    item_id: string;
    item_name: string;
    item_image: string;
    item_description: string;
    star_count: number;
}

export default function Item({ item_id, item_name, item_image, star_count }: ItemProps) {
    return (
        <Box w="400px" h="650px" borderRadius="30px" bg="#F2F2F2" overflow="hidden" float="left" ml="30px" cursor="pointer" onClick={() => window.open(`https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=${item_id}`)}>
            <Image src={item_image} alt={item_name} w="400px" h="400px" />
            <Box color="black" p="20px">
                <Text fontSize="25px">{item_name}</Text>
                <Star score={star_count} />
                {/* <Text mt="15px">{item_description}</Text> */}
            </Box>
        </Box>
    );
}