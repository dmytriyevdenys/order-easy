import s from "./Tags.module.scss";
import { TTag } from "interfaces/order/tag.type";
import { useRef, useState } from "react";
import { TagItem } from "./TagDropDown/TagItem/TagItem";
import { TagDropDown } from "./TagDropDown/TagDropDown";
import { Button } from "components/shared/ui/Buttons/Button/Button";
import { useGetTags } from "hooks/Order/useGetTags";

type TagsProps = {
  tags?: TTag[];
};
export const Tags: React.FC<TagsProps> = ({ tags }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tagsInList, setTagsInList] = useState<TTag[]>(tags || []);
  const { data: tagsData, refetch: getTags } = useGetTags();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const addTag = (tagToAdd: TTag) => {
    if (!tagsInList.some((existingTag) => existingTag.id === tagToAdd.id)) {
      setTagsInList((prev) => [...prev, tagToAdd]);
    }
  };
  const removeTag = (id: number) => {
    const updatedTags = tagsInList.filter((tag) => tag.id !== id);
    setTagsInList(updatedTags);
  };
  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
    !isOpen && getTags();
  };

  const tagsUnique = tagsData?.filter(
    (tagItem) =>
      !tagsInList.some((tagListItem) => tagListItem.id === tagItem.id)
  );
  return (
    <div className={s.container} ref={containerRef}>
      <div className={s.tags_list}>
        <Button
          variant="mini"
          style={{ minWidth: 44, backgroundColor: "#EBECF0", color: "#42526E" }}
          onClick={handleOnClick}
        >
          Тег
        </Button>
        {tagsInList.map((tagItem) => (
          <TagItem
            id={tagItem.id}
            key={tagItem.id}
            name={tagItem.name}
            color={tagItem.color}
            closeIcon
            removeTag={removeTag}
          />
        ))}
      </div>
      <div>
        <TagDropDown
          addTag={addTag}
          listWidth={String(containerRef.current?.clientWidth)}
          tags={tagsUnique || []}
          closeDropDown={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};
