<?php
$hash2b = "\$2b\$12\$7s2.oWiSD3Q1bS5HmL.4zeV59uzZyifoiQhfRDiRR9SLF/I6wpb7O";
$hash2y = str_replace('$2b$', '$2y$', $hash2b);
var_dump(password_verify('admin', $hash2y));
var_dump(password_verify('Admin', $hash2y));
