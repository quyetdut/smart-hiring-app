import chroma from "chroma-js";
import React, { useEffect, useState } from "react";
import useMemberToRadarChart from "hook/useMemberToRadarChart";
import styles from "./MatchingSelection.module.scss";
import {
  STATUS,
  COLOR_THREE_SELECTION,
  COLOR_ONE_SELECTION
} from "core/constants";
function MatchingSelection({
  maxSelected,
  listColor,
  projectId,
  position,
  statusDropdown,
  onChangeSelected,
  isReset,
  setIsReset
}) {
  const [members] = useMemberToRadarChart(projectId, position, statusDropdown);
  const [listSelected, setListSelected] = useState([]);
  const [colors, setColors] = useState(listColor);
  const [isResetSelected, setIsResetSelected] = useState(false);
  useEffect(() => {
    onChangeSelected && onChangeSelected(listSelected);
  }, [listSelected]);
  useEffect(() => {
    if (!isReset) return;
    setListSelected(() => []);
    setIsReset(false);
    setIsResetSelected(true);
    if (statusDropdown === STATUS[0]) {
      setColors(COLOR_ONE_SELECTION);
    } else {
      setColors(COLOR_THREE_SELECTION);
    }
  }, [isReset]);
  const selectedHandler = (checked, option) => {
    if (!checked) {
      removeFromList(option);
    } else {
      if (listSelected.length < maxSelected) {
        let tempColors = [...colors];
        pushToList({ ...option, color: tempColors.pop() });
        setColors(tempColors);
      }
    }
  };

  const pushToList = (option) => {
    setListSelected((prevList) => [...prevList, option]);
  };

  const removeFromList = (option) => {
    setListSelected((prevList) =>
      prevList.filter((member) => member.userId !== option.userId)
    );
    if (option.color) {
      setColors([...colors, option.color]);
    }
  };

  const changeable = (option) => {
    if (
      listSelected.length >= maxSelected &&
      listSelected.findIndex((member) => member.userId === option.userId) === -1
    ) {
      return false;
    }
    return true;
  };

  const handleRenderMatchingItems = () => {
    if (members && members.length > 0) {
      let tempMembers = [...members];
      tempMembers = tempMembers.map((member) => {
        const found = listSelected.find(
          (selected) => selected.userId === member.userId
        );
        return found ? found : member;
      });
      return tempMembers.map((member, index) => (
        <MatchingItem
          key={index}
          member={member}
          changeable={changeable(member)}
          onSelected={(checked) => selectedHandler(checked, member)}
          isResetSelected={isResetSelected}
          setIsResetSelected={setIsResetSelected}
        />
      ));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Matches</div>
      <div className={styles.content}>
        <div className={styles.listContent}>{handleRenderMatchingItems()}</div>
      </div>
    </div>
  );
}

const MatchingItem = ({
  member,
  onSelected,
  changeable,
  isResetSelected,
  setIsResetSelected
}) => {
  useEffect(() => {
    if (!isResetSelected) return;
    setChecked(false);
    setIsResetSelected(false);
  }, [isResetSelected]);
  const [checked, setChecked] = useState(false);
  const { icon, name, positionName, matching } = member;

  const changeHandler = (e) => {
    if (changeable) {
      setChecked(e.target.checked);
      onSelected && onSelected(e.target.checked);
    }
  };

  const colorSchema = () => ({
    backgroundColor: chroma(member.color).alpha(0.5),
    color: member.color
  });

  return (
    <label
      className={styles.listItem}
      style={checked && member.color ? colorSchema() : {}}
    >
      <img src={icon} className={styles.thumbnail} alt="" />
      <div className={styles.textItem}>
        <h4>{name}</h4>
        <p>
          {positionName} <span> | </span> {matching}% matching
        </p>
      </div>
      <input
        type="checkbox"
        className={styles.checkbox}
        hidden
        checked={checked}
        onChange={changeHandler}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default MatchingSelection;
