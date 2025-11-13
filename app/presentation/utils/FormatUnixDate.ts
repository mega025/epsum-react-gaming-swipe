export const formatUnixDate = (unixTimestamp: number) => {
    if (unixTimestamp < 10000000000) {
        unixTimestamp *= 1000;
    }

    const date = new Date(unixTimestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
}