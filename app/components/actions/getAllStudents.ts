export default async function getAllStudents() {
    const response = await fetch('http://3.27.132.94/api/v1/students/get-all-student')
    
    if(!response.ok) {
        throw new Error('Fetch data students failed')
    }

    const studentsInfo = await response.json()

    return studentsInfo

}