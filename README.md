1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?
searchText has to change on every keystroke, or the text box would feel stuck, because a controlled input shows whatever is in state. debouncedSearch only changes after the user stops typing for 300 ms, and the filtering uses that one. With a single state, the list would re-filter on every key press.

2. What would happen if the debounce effect did not return a cleanup function?
Every keystroke would start a new timer without cancelling the old one. All those timers would still fire, so the list would update once per keystroke, just delayed, and older values could arrive after newer ones. It wouldn't be a real debounce.

3. What is the purpose of the dependency array? What happens if it is empty? What if it is left out?
The dependency array tells React which values an effect depends on, so the effect only re-runs when one of them changes. With [], the effect runs once, right after the first render. If it's left out completely, the effect runs after every render, which is wasteful and can cause infinite loops if the effect sets state.

4. Why should we avoid sorting the original products array directly?
.sort() changes the array in place. That mutates shared data, so the original "Default" order is lost and React state or imported data gets modified, which causes bugs. Making a copy first with [...filteredProducts].sort(...) keeps the original unchanged.

5. Is the filtered list better stored in its own state, or calculated during rendering?
It's better calculated during rendering. The list is fully determined by debouncedSearch, category and sortOrder, so storing it would duplicate data and need extra code to keep it in sync, which risks showing a stale list. Calculating it each render is simpler and always correct.
