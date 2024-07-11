package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dao.UsuarioDAO;
import modelo.Usuario;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

// Esta anotación mapea el servlet a la URL "/GestionUsuariosServlet"
@WebServlet("/GestionUsuariosServlet")
public class GestionUsuariosServlet extends HttpServlet {
    
    private UsuarioDAO usuarioDAO;
    private ObjectMapper objectMapper;

    public GestionUsuariosServlet() {
        this.usuarioDAO = new UsuarioDAO();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Configura la respuesta como JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String idParam = request.getParameter("id");
        if (idParam != null) {
            // Si se proporciona un ID, obtener un usuario específico
            int id = Integer.parseInt(idParam);
            Usuario usuario = usuarioDAO.obtenerPorId(id);
            objectMapper.writeValue(response.getWriter(), usuario);
        } else {
            // Si no se proporciona ID, obtener todos los usuarios
            List<Usuario> usuarios = usuarioDAO.obtenerTodos();
            objectMapper.writeValue(response.getWriter(), usuarios);
            //convierte la lista de usuarios en JSON y la envía como respuesta HTTP
        }
    }
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
 
    Usuario usuario = objectMapper.readValue(request.getReader(), Usuario.class);
    boolean exito = usuarioDAO.modificar(usuario);
    
    response.setContentType("application/json");
    // Establece la codificación de caracteres de la respuesta como UTF-8
    response.setCharacterEncoding("UTF-8");
    // Escribe la respuesta JSON
    response.getWriter().write("{\"exito\": " + exito + "}");
}

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int id = Integer.parseInt(request.getParameter("id"));
    
    boolean exito = usuarioDAO.eliminar(id);
    
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    // Escribe la respuesta JSON
    response.getWriter().write("{\"exito\": " + exito + "}");

}
}
