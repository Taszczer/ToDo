

export default function Note() {
    return (
        <form className="absolute top-[40%] right-32" encType="multipart/form-data">
            <p>Notebook</p>
            <textarea name="uploaded_file" className="border-4 border-orange-primary w-[360px] min-h-[300px] rounded-xl focus:outline-0 focus:border-orange-secondary p-4" />
        </form>
    )
}