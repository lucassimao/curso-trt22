<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@page pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Prática spring mvc</title>
</head>
<body>
    <form action="${pageContext.request.contextPath}/" method="POST">
        <label>
            Nome:
            <input required type="text" name="nome">
        </label>
        <label>
            oab:
            <input type="text" name="oab">
        </label>
        <input type="submit" value="Enviar">
    </form>


    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Oab</th>
                <th>Excluir</th>
            </tr>
        </thead>
        <tbody>
                <c:forEach items="${advogados}" var="adv">
                    <tr>
                        <td>
                                <c:out value = "${adv.id}"/>
                        </td>
                        <td>
                                <c:out value = "${adv.nome}"/>
                        </td>
                        <td>
                                <c:out value = "${adv.oab}"/>
                        </td>
                        <td>
                            <a href="${pageContext.request.contextPath}/excluir/${adv.id}">X</a>
                        </td>
                    </tr>
                     </c:forEach>
        </tbody>
    </table>
    
</body>
</html>