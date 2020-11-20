export default {
    bind(el, {value}) {
        window.M.Tooltip.init(el, {html: value})
    }, unbind(el) { //аналогия desctroed
        const tooltip = window.M.getInstance(el)

        if(tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}