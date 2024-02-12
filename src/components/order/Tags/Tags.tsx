import s from "./Tags.module.scss";
import { TTag } from "interfaces/order/tag.type";
import { useRef, useState } from "react";
import { TagItem } from "./TagDropDown/TagItem/TagItem";
import { TagDropDown } from "./TagDropDown/TagDropDown";
import { Button } from "components/shared/ui/Button/Button";
import { useGetTags } from "hooks/Order/useGetTags";

type TagsProps = {
  newTag?: TTag;
  tags?: TTag[];
};
export const Tags: React.FC<TagsProps> = ({ tags, newTag }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: tagsData, isSuccess, refetch: getTags } = useGetTags();

  const [tag, setTag] = useState<TTag[]>(tags || []);
  const containerRef = useRef<HTMLDivElement>(null);
  const addTag = (tagToAdd: TTag) => {
    if (!tag.some((existingTag) => existingTag.id === tagToAdd.id)) {
        setTag((prev) => [...prev, tagToAdd]);
      }
  };

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
    !isOpen && getTags();
  };
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
        {tag.map((tagItem) => (
          <TagItem id={tagItem?.id} name={tagItem.name} color={tagItem.color} />
        ))}
      </div>
      <div >
      <TagDropDown
        addTag={addTag}
        listWidth={String(containerRef.current?.clientWidth)}
        tags={tagsData || []}
        closeDropDown={() => setIsOpen(false)}
        isOpen={isOpen}
      />
      </div>
      
    </div>
  );
};
