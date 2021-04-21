declare const Swiper: React.FC<
    Partial<{
        width: number;
        height: number;
        childWidth: number;
        paginationSelectedColor: string;
        autoplay: boolean;
        loop: boolean;
        showPagination: boolean;
        direction: 'row';
    }>
>;

export default Swiper;
