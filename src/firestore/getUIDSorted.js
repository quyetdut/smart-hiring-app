export const getUidSorted = (user, peerUser) => {
  const { uid } = user;
  const peerUid = peerUser?.uid || "";
  return uid > peerUid ? `${uid}:${peerUid}` : `${peerUid}:${uid}`;
};
