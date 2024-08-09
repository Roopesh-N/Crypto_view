export const BannerImg="https://t4.ftcdn.net/jpg/04/91/04/57/360_F_491045782_57jOG41DcPq4BxRwYqzLrhsddudrq2MM.jpg";

export const numberWithCommas=(x)=>{
    if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}


