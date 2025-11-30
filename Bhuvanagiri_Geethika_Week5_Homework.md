# Week 5 Homework: Personalized Relational Algebra


**Student:** Geethika
**Student ID:** S001
**Favorite Number:** 42


# My Data Record

S001, Geethika	,42,	The quick brown fox jumps over the lazy dog near the ancient oak tree.


# Word Extraction Queries

# Query 1: Find My Record
**Expression:** $\sigma_{studentName = 'Geethika'}(StudentData)$
**Result:** S001, Geethika, 42, The quick brown fox jumps over the lazy dog near the ancient oak tree.

# Query 2: Extract 3rd Word
**My 3rd word:** brown
**Expression:** $\pi_{WORD(randomParagraph, 3)}(\sigma_{studentName = 'Geethika'}(StudentData))$
**Explanation:** First, use Selection ($\sigma$) to isolate the record where `studentName` equals 'Geethika'. Then, use Projection ($\pi$) with the hypothetical string function $WORD(randomParagraph, 3)$ to extract the third word, 'brown'.

### Query 3: Extract 7th Word
**My 7th word:** the
**Expression:** $\pi_{WORD(randomParagraph, 7)}(\sigma_{studentName = 'Geethika'}(StudentData))$
**Explanation:** Use Selection ($\sigma$) to isolate the record where `studentName` equals 'Geethika'. Then, use Projection ($\pi$) with the hypothetical string function $WORD(randomParagraph, 7)$ to extract the seventh word, 'the'.

# Query 4: Favorite Number Greater Than Yours
**Expression:** $\sigma_{favoriteNumber > 42}(StudentData)$
**Result:** All complete rows of students whose `favoriteNumber` is 43 or higher.

# Query 5: Favorite Number Less Than Yours
**Expression:** $\sigma_{favoriteNumber < 42}(StudentData)$
**Result:** All complete rows of students whose `favoriteNumber` is 41 or lower.

# Query 6: Find students whose randomParagraph contains the same 3rd word as yours
**Expression:** $\sigma_{WORD(randomParagraph, 3) = 'brown'}(StudentData)$
**Result:** All complete rows of students for whom the third word of their `randomParagraph` is 'brown'.

# Query 7: Project studentName and favoriteNumber for favoriteNumber between 20 and 50
**Expression:** $\pi_{studentName, favoriteNumber}(\sigma_{favoriteNumber \ge 20 \land favoriteNumber \le 50}(StudentData))$
**Result:** A table with two columns (`studentName` and `favoriteNumber`) containing the records of all students whose favorite number is between 20 and 50, inclusive.

# Query 8: Find YOUR favoriteNumber using only your student_id
**Expression:** $\pi_{favoriteNumber}(\sigma_{student\_id = 'S001'}(StudentData))$
**Result:** A table/set containing the single value **42**.

# Query 9: Union of two groups 
Find all students where (favoriteNumber > 50) OR (favoriteNumber < 10)
**Expression:** $\sigma_{favoriteNumber > 50}(StudentData) \cup \sigma_{favoriteNumber < 10}(StudentData)$
**Result:** All complete rows (records) of students whose `favoriteNumber` is either **greater than 50** or **less than 10**. This result combines the two sets of records into one single relation.

# Query 10: Set difference 
Find all students EXCEPT those with favoriteNumber between 20 and 80
**Expression:** $StudentData - \sigma_{favoriteNumber \ge 20 \land favoriteNumber \le 80}(StudentData)$
**Result:** All complete rows of students whose `favoriteNumber` is **less than 20** or **greater than 80**. (These are the students who fall outside the 20 to 80 range).

# Query 11: Intersection 
Find students whose favoriteNumber is BOTH > 30 AND < 70
**Expression:** $\sigma_{favoriteNumber > 30}(StudentData) \cap \sigma_{favoriteNumber < 70}(StudentData)$
**Result:** All complete rows of students whose `favoriteNumber` is strictly **between 30 and 70** (i.e., any number from 31 to 69, inclusive).

# Query 12: Complex projection 
Project only student_id and studentName for students with even favoriteNumbers
**Expression:** $\pi_{student\_id, studentName}(\sigma_{favoriteNumber \bmod 2 = 0}(StudentData))$
**Result:** A table with two columns (`student\_id` and `studentName`) containing the records of all students whose `favoriteNumber` is an **even number**.

# Query 13: Multi-condition selection 
Find students whose favoriteNumber equals YOUR favoriteNumber AND are NOT you
**Expression:** $\sigma_{(favoriteNumber = 42) \land (studentName \neq 'Geethika')}(StudentData)$
**Result:** All complete rows of students who have a `favoriteNumber` of **42** but whose `studentName` is **not 'Geethika'**.

# Query 14: Comprehensive query 
Find count of students with favoriteNumber within $\pm 10$ of YOUR favoriteNumber (42)
**Expression:** $\sigma_{favoriteNumber \ge 32 \land favoriteNumber \le 52}(StudentData)$
**Result:** This expression returns all complete rows of students whose `favoriteNumber` is between **32 and 52**, inclusive. The final answer requires the **COUNT** (cardinality) of the resulting tuples in this relation.