export const PAGE_SIZE = 10
export const TIME_CACHE = 5

export const POSITION = [
    { value: "Frontend", label: "Frontend-разработчик", type : "position" as const},
    { value: "Backend",  label: "Backend-разработчик", type : "position" as const},
    { value: "Analyst",  label: "Аналитик", type : "position" as const},
    { value: "Manager",  label: "Менеджер", type : "position" as const},
    { value: "Designer", label: "Дизайнер", type : "position" as const},
]

export const GENDER = [
    { value: "Male",   label: "Мужчина", type : "gender" as const},
    { value: "Female", label: "Женщина", type : "gender" as const},
]
export const STACK = [
    { value: "CSharp", label: "C#", type : "stack" as const},
    { value: "React",  label: "React", type : "stack" as const},
    { value: "Java",   label: "Java", type : "stack" as const},
    { value: "PHP",    label: "PHP", type : "stack" as const},
    { value: "Figma",  label: "Figma", type : "stack" as const},
    { value: "Word",   label: "Word", type : "stack" as const},
]