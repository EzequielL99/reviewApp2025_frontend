import {isAxiosError} from 'axios';
import api from "@/lib/axios";
import { Issue, Review } from '../types';

type IssueAPI = {
    issueId: Issue['_id'],
    reviewId: Review['_id']
}

export async function updateIssue({issueId, reviewId} : Pick<IssueAPI, 'issueId' | 'reviewId'>){
    try{
        const {data} = await api.patch<string>(`/reviews/${reviewId}/issues/${issueId}`)

        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

