import { setDoc, doc, collection, updateDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app, db, realTimeDb, realTimeDbRef } from "./firebase";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { set } from "firebase/database";

//Upload Picture to Media Bucket
const storage = getStorage(app);

export const uploadPdf = async (file, name) => {
	const documentRef = ref(storage, name);
	const result = await uploadBytes(documentRef, file);
	return result;
};

export const getCollection = (endpoint) => collection(db, endpoint);

//const clientsCollection = getCollection("songs");
export const addNewValue = (docu, documentTitle, newCollection) => {
	const collection = getCollection(docu);
	return setDoc(doc(collection, documentTitle), newCollection);
};

//const billsCollection = getCollection("facturas");
export const addBill = (billsCollection, documentTitle, newCollection) =>
	setDoc(doc(billsCollection, documentTitle), newCollection);

// export const updateCounter = (counterCollection, newCollection) =>
// 	setDoc(doc(counterCollection, ""), newCollection);

const importBillsCollection = getCollection("importe");
export const importBills = (documentTitle, newCollection) =>
	setDoc(doc(importBillsCollection, documentTitle), newCollection);

const albaranCollection = getCollection("albaran");
export const addAlbaran = (documentTitle, newAlbaran) => setDoc(doc(albaranCollection, documentTitle), newAlbaran);
export const updateById = (url, id, data) => {
	const urlReference = doc(db, url, id);
	updateDoc(urlReference, data);
};

// instance of Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const onSignin = async ({ email, password }) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signInGmail = async () => {
	try {
		return await signInWithPopup(auth, googleProvider);
	} catch (err) {
		return err;
	}
};

export const updateInfo = async () => {
	const itemCollection = getCollection("clients");
	let data;
	getDocs(itemCollection).then((res) => {
		data = res.docs.map((item) => ({ ...item.data(), uid: item.id }));
	});

	return data;
};

export const getNotifications = realTimeDbRef(realTimeDb, "/notifications");
export const addNotification = (data) => {
	try {
		set(getNotifications, data);
		const success = "Notificación agregado exitosamente";
		return success;
	} catch (error) {
		const failure = error;
		return failure;
	}
};

export const getById = async ({ name, id }) => {
	const ref = doc(collection(db, name), id);
	try {
		const result = await getDoc(ref);
		const values = await result.data();
		return values;
	} catch (error) {
		return error;
	}
};

export const onUpdateSubCollectionById = async (userId, document, element, data) => {
	//endpoint, documentId, data
	// return new Promise((resolve, reject) => {
	// 	try {
	// 		const performUpdate = async () => {
	// 			await setDoc(doc(db, endpoint, documentId), data);
	// 		};
	// 		performUpdate();
	// 		resolve("Document updated successfully");
	// 	} catch (error) {
	// 		console.log("there is an error", error);
	// 		reject(error);
	// 	}
	// });
	db.collection(userId)
		.doc(document)
		.update({
			[element]: data,
		})
		.then(function () {
			console.log("Frank food updated");
		});
};

export const onDelete = async (endpoint, id) => {
	let result;
	try {
		await deleteDoc(doc(db, endpoint, id));
		result = "El document ha sido eliminado con éxito";
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

export const onSignOut = () => signOut(auth);
