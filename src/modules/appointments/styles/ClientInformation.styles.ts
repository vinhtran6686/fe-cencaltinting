import { spacing, borderRadius, colors } from "@/theme/tokens";
import styled from "@emotion/styled";

const StyledSelectContactBox = styled.div`
   background-color: ${colors.formItemBackground};
   border-radius: ${borderRadius.lg}; 
   height: 48px;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 ${spacing.md};
   cursor: pointer;
   &:hover{
    background-color: ${colors.formItemBackgroundHover};
   }
   span{
    width: 20px;
    height: 20px;
    background-image: url('/images/icons/sidebar/right.svg');
   }
`;

export { StyledSelectContactBox };