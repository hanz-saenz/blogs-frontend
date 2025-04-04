import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, Select, Upload, message, Spin, Popconfirm } from "antd";
import { UploadOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import apiURL from "../../UrlBackend";
import { editarCategoriaId, getCategoriaId, eliminarcategoriaId } from "../../servicios/blogServicios";

const { TextArea } = Input;
const { Option } = Select;

const EditarDrawer = ({ 
  categoriaId, 
  open, 
  onClose, 
  listaCategorias,
}) => {
  const [formulario] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [categoriaData, setCategoriaData] = useState(null);

  

  // Obtener datos de la entrada
  useEffect(() => {

    const datosEntrada = async () => {
      setLoading(true);
      try {
        const entradaRes = await getCategoriaId(categoriaId.id);
        setCategoriaData(entradaRes);
        
        formulario.setFieldsValue({
          nombre: entradaRes.nombre,
        });

      } catch (error) {
        message.error('Error al cargar los datos de la entrada');
        // onClose();
      } finally {
        setLoading(false);
      }
    };

    datosEntrada();
  }, [categoriaId, formulario,]);

  const guardarCategoria = async (e) => {
    e.preventDefault();
    try {
      const values = await formulario.validateFields();
      setLoading(true);

      const formData = new FormData();

      formData.append('nombre', values.nombre);

      await editarCategoriaId(categoriaId.id, formData);

      message.success('Entrada actualizada correctamente');
      formulario.resetFields();
      onClose();
      await listaCategorias();
    } catch (error) {
      if (error.response?.status === 400) {
        message.error('Error en los datos: ' + JSON.stringify(error.response.data));
      } else {
        message.error('Error al actualizar la entrada');
      }
    } finally {
      setLoading(false);
    }
  };


  const eliminarCategoria = async () => {

    try {
        await eliminarcategoriaId(categoriaId.id);
        message.success('Categoria eliminada correctamente');
        onClose();
        await listaCategorias();
    } catch (error) {
      console.log(error);
    }

  }

  

  return (
    <Drawer
      title="Editar Entrada"
      width={530}
      onClose={onClose}
      open={open}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Popconfirm
            title="¿Estás seguro de eliminar esta entrada?"
            onConfirm={eliminarCategoria}
            okText="Sí"
            cancelText="No"
            okButtonProps={{ loading: deleting }}
          >
            <Button danger icon={<DeleteOutlined />} loading={deleting}>
              Eliminar
            </Button>
          </Popconfirm>
          
          <div>
            <Button onClick={onClose} icon={<CloseOutlined />} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button 
              type="primary" 
              onClick={guardarCategoria}
              icon={<SaveOutlined />}
              loading={loading}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      }
    >
      <Spin spinning={loading && !categoriaData}>
        <Form form={formulario} layout="vertical">
          <Form.Item 
            label="Nombre"  
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default EditarDrawer;