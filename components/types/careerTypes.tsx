export interface occupationType{
    eng_name: string,
    chi_name: string,
    created_at: string,
    occupation_id: number,
    price: number,
    img_url: string,
    img_path: string,
}

export interface questionType{
    question: string,
    answer: string,
    created_at: string,
    question_id: number,
    occupation_id: number,
    [key: string]: any
}

export interface cartType{
    cart_id: number,
    occupation_id: number,
    user_id: string,
    occupation: any
}
  