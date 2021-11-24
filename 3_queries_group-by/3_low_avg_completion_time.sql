SELECT students.name AS student_name, avg(assignment_submissions.duration) AS average_completion_time, avg(assignments.duration) AS average_estimated_duration
FROM students
JOIN assignment_submissions ON student_id = students.id
JOIN assignments ON assignment_id = assignments.id
WHERE end_date IS NULL
GROUP BY student_name
HAVING avg(assignment_submissions.duration) < avg(assignments.duration)
ORDER BY average_completion_time;