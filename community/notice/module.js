import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp, doc, getDoc,} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 기록 저장 함수
window.saveNotice = async function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
    // Firestore에 기록 추가
    const docRef = await addDoc(collection(db, "notices"), {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
    });

        console.log("Document written with ID: ", docRef.id);
        alert("성공적으로 기록되었습니다.");
        document.getElementById("noticeForm").reset();
        document.getElementById("noticeFormContainer").style.display = "none";
        await loadNotices(); // 새로고침 없이 목록 업데이트
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("오류가 발생했습니다: " + error.message);
    }
};

// 기록 목록 로드 함수
window.loadNotices = async function() {
    const noticeList = document.getElementById('noticeList');
    noticeList.innerHTML = '';  // 기존 목록 초기화

    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="detail/index.html?id=${doc.id}" target="_blank">${data.title}</a></td>
            <td>${new Date(data.createdAt.seconds * 1000).toLocaleString()}</td>
        `;
        noticeList.appendChild(row);
    });
}

// 페이지 로드 시 기록 목록 로드
document.addEventListener('DOMContentLoaded', () => {
    loadNotices(); // 페이지 로드 시 기록 목록 로드
});