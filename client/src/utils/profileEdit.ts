import { TProfile } from "../types/profileTypes"
import { supabase } from './../supabaseClient';

const upsertProfile = async(UProfileData: TProfile) => {
    try {
        try {
            const {data, error} = await supabase
            .from('profiles')
            .upsert(UProfileData)

            if (error)  {
                throw new Error(error.message)
            }
        }
        catch(error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                throw error;
            }
        }
                            
    }catch(error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
    }
}


export {upsertProfile}