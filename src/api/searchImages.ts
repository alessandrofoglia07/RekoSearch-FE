import { CompleteImageResponse, ShortImageResponse } from "@/types";
import axios from "./axios";

export const searchByLabel = async (search: string, shortResponse: boolean = false): Promise<ShortImageResponse[] | CompleteImageResponse[]> => {
    const labels = search.split(' ').filter((label) => label.length > 2);
    const data: ShortImageResponse[][] | CompleteImageResponse[][] = await Promise.all(
        labels.map(async (label) => {
            const res = await axios.get(`/images/label/${label}?short=${shortResponse}`);
            return res.data as (ShortImageResponse[] | CompleteImageResponse[]);
        })
    );
    const images = data.flat();
    return images;
};