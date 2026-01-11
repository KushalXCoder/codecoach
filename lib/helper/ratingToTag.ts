export const RatingToTag = (rating: number): string => {
    if(rating >= 800 && rating <= 1000) return 'easy';
    if(rating > 1000 && rating <= 1200) return 'medium';
    if(rating > 1200 && rating <= 1400) return 'hard';
    return 'expert';
}