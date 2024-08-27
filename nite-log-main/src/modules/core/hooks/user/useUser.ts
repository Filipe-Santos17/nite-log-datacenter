import {IUser} from "../../types/User";
import {User} from "@firebase/auth";
import {db} from "../../service/firebase";
import {setDoc, collection, getDocs, query, updateDoc, where, doc} from "firebase/firestore";

type useUserReturn = {
    addUserToDatabase(firebaseUser: User, displayName: string, email: string): Promise<IUser>,
    getUserFromDatabase(email: string): Promise<IUser>,
    updateUserSchedule(user: IUser): Promise<void>
}

export const useUser = (): useUserReturn => {
    const usersRef = collection(db, "users");

    const addUserToDatabase = async (firebaseUser: User, displayName: string, email: string): Promise<IUser> => {
        const user: IUser = {
            displayName: displayName,
            email: email,
            schedule: "not initialized",
            userId: firebaseUser.uid
        }

        const userRef = doc(db, "users", firebaseUser.uid);
        await setDoc(userRef, user);
        return user;
    }

    const getUserFromDatabase = async (email: string): Promise<IUser> => {
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) throw new Error("User not found");

        return querySnapshot.docs[0].data() as IUser;
    }

    const updateUserSchedule = async (user: IUser) => {
        const userRef = doc(db, "users", user.userId);
        await updateDoc(userRef, {
            schedule: user.schedule
        });
    }

    return {
        addUserToDatabase,
        getUserFromDatabase,
        updateUserSchedule
    };
}