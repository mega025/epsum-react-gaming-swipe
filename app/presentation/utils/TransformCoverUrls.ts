export const NO_IMAGE_URL = "https://www.igdb.com/assets/no_cover_show-ef1e36c00e101c2fb23d15bb80edd9667bbf604a12fc0267a66033afea320c65.png"

export const transformCoverUrl = (url: string) => {
    const cutUrlFirstPart = url.substring(0, 38);
    const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
    return "https:"+cutUrlFirstPart+"cover_big_2x/"+cutUrlSecondPart;
}

export const transformSmallCoverUrl = (url: string) => {
    const cutUrlFirstPart = url.substring(0, 38);
    const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
    return "https:"+cutUrlFirstPart+"cover_big/"+cutUrlSecondPart;
}

export const transformLogoUrlCompany = (url:string) => {
    const cutUrlFirstPart = url.substring(0, 38);
    const match = url.match(/\/([^\/]+)\.\w+$/);
    if (match) {
        const code = match[1];
        return "https:"+cutUrlFirstPart+"original/"+code+".jpg";
    }
    return
}