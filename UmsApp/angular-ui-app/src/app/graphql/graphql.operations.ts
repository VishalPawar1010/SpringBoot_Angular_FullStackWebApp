import { gql } from "apollo-angular";
 
const searchForCourseOfferings = gql
`query{
  searchForCourseOfferings(
  date:"2024-06-11T10:56:51.478Z",
  contextInfo:
    {scopingCatalogRefObjectUri:"http://student.kuali.org/wsdl/courseofferingset/SocInfo",
    scopingCatalogId:"main.soc.4.kuali.atp.SU2022-2023"}){
    id
    name
    courseId
    termId
  }
}

`;

export {searchForCourseOfferings} ;