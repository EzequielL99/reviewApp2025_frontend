import {isAxiosError} from 'axios';
import api from "@/lib/axios";
import { Issue, Review } from '../types';

type IssueAPI = {
    issueId: Issue['_id'],
    reviewId: Review['_id']
}

export async function updateTask({issueId, reviewId} : Pick<IssueAPI, 'issueId' | 'reviewId'>){
    try{
        const {data} = await api.patch(`/${reviewId}/issues/${issueId}`)

        console.log(data);
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

