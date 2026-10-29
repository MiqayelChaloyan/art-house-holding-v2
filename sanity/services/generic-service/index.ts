export const PARTNERS_QUERY = 
`*[_type == "partners"] {
    _id,
    logo,
    "company_name": company_name[$language],
    "cooperation": cooperation[$language],
    "implemented_projects": implemented_projects[$language],
}`;