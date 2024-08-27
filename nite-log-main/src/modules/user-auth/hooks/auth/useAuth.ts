import {useState} from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../../../core/service/firebase";
import {IUser} from "../../../core/types/User";
import {useAttendance} from "../attendance/useAttendance";
import {useUser} from "../../../core/hooks/user/useUser";

type useAuthReturn = {
    isLoading: boolean,
    user?: IUser,
    error?: string,
    createUser(displayName: string, email: string, password: string, activeCode: string | null): void,
    logUserIn(email: string, password: string, activeCode: string | null): void,
    logUserOut(): Promise<void>
}

export const useAuth = (): useAuthReturn => {
    const {
        addUserToAttendanceList,
    } = useAttendance();
    const {
        addUserToDatabase,
        getUserFromDatabase
    } = useUser();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("")
    const [user, setUser] = useState<IUser>()

    const createUser = async (displayName: string, email: string, password: string, activeCode: string | null) => {
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const firebaseUser = userCredential.user;
                const user = await addUserToDatabase(firebaseUser, displayName, email);

                setUser(user);
                addUserToAttendanceList(activeCode, user.userId);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const logUserIn = async (email: string, password: string, activeCode: string | null) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(async () => {
                const user = await getUserFromDatabase(email);
                setUser(user);
                addUserToAttendanceList(activeCode, user.userId);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const logUserOut = async (): Promise<void> => {
        await signOut(auth);
        return
    }

    return {
        isLoading,
        user,
        error,
        createUser,
        logUserIn,
        logUserOut
    };
}