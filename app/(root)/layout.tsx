import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth()
    if (!userId) {
        redirect("sign-in")
    }

    let store;
    try {
        store = await db.store.findFirst({
            where: {
                userId
            }
        });
    } catch (error) {
        console.error("Gagal terhubung ke database:", error);
        // Tambahkan logika penanganan kesalahan di sini
    }

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
        {children}
        </>
    )

}