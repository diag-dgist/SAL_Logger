<div align="center">
   <h1>Search As Learning (SAL) Logger</h1>
    <br><img src="https://github.com/diag-dgist/SAL_Logger/blob/master/SAL_logger.png" width="700">
   <br><br> 
   This is the official repository for our <b>paper</b>:<br>
    <a href="https://arxiv.org/abs/2410.01396">Can We Delegate Learning to Automation?: A Comparative Study of LLM Chatbots, Search Engines, and Books </a>
</div><br><br>

```
@article{yang2024can,
  title={Can We Delegate Learning to Automation?: A Comparative Study of LLM Chatbots, Search Engines, and Books},
  author={Yang, Yeonsun and Shin, Ahyeon and Kang, Mincheol and Kang, Jiheon and Song, Jean Y},
  jounal={arXiv preprint arXiv:2410.01396},
  year={2024}
}
 ```
<br>

The SAL logger was instrumented as the apparatus. This system records timestamped user interactions within the browser (e.g., keyboard input, mouse clicks, and dragging) to analyze learner activeness and behavior. We developed the SAL logger as a Chrome extension using HTML and JavaScript. It has a client-server architecture that enables authentication, stores search histories, collects learning logs, and provides study materials in PDF format. If you plan to use the system for logging, update the code with your own server path for data collection. 

For more details on how the system operates and the specific data logged, please refer to our paper. If you have any problems or questions, feel free to contact us (diddustjs98@dgist.ac.kr).
