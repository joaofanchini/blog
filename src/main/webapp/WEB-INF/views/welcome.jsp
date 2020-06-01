<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib tagdir="/WEB-INF/tags" prefix="tags-blog" %>

<html>
<head><title>Welcome JSP</title></head>
<body>
<h1>Welcome!</h1>
<c:out value="${name}"/>

<tags-blog:testNameField id="test"/>
</body>
</html>