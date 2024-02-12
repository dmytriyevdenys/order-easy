import { Button } from "components/shared/ui/Button/Button";
import s from "./TagDropDown.module.scss";
import { useState } from "react";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { useGetTags } from "hooks/Order/useGetTags";
import { TagItem } from "./TagItem/TagItem";
import { TTag } from "interfaces/order/tag.type";

type TagDropDownProps = {
  addTag?: (newTag: TTag) => void;
  closeDropDown: (b: boolean) => void
  listWidth: string;
  isOpen: boolean;
  tags: TTag[];
}
export const TagDropDown: React.FC<TagDropDownProps> = ({addTag, closeDropDown, listWidth, isOpen, tags}) => {

    return (
    <div className={s.container}>
      <div className={s.tag_button_container}>
  
      </div>
      {isOpen && (
        <DropDown
          listWidth={listWidth}
          show={isOpen}
          closeToClickElement
          closeDropDown={() => {isOpen && closeDropDown(false)}}
        > <div className={s.tags}>
          {isOpen && tags.map(tag => (
           <div key={tag.id} onClick={() =>addTag && addTag(tag)}><TagItem key={tag.id} id={tag.id} name={tag.name} color={tag.color}/></div> 
          ))}
             </div>
        </DropDown>
      )}
    </div>
  );
};
