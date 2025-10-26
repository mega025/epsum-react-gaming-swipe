export const transformCoverUrl = (url: string) => {
    const cutUrlFirstPart = url.substring(0, 38);
    const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
    return "https:"+cutUrlFirstPart+"cover_big_2x/"+cutUrlSecondPart;
}